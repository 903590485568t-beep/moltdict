import { supabase } from '../lib/supabase';

let socket = null;
let isScanning = false;

export const startTokenScanner = (onTokenFound) => {
    if (isScanning) return;
    isScanning = true;

    console.log("🦞 Starting $MoltDict Scanner on PumpFun...");

    try {
        socket = new WebSocket('wss://pumpportal.fun/api/data');

        socket.onopen = () => {
            console.log('✅ Connected to PumpFun Stream');
            // Subscribe to new token creations
            socket.send(JSON.stringify({ method: "subscribeNewToken" })); 
        };

        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            
            // Check if it's a new token creation event
            if (data.txType === 'create') {
                const name = data.name?.toLowerCase();
                const symbol = data.symbol?.toLowerCase();
                
                // Target: ONLY $MoltDict (Strict)
                if (name?.includes('moltdict')) {
                    console.log('🚨 TOKEN FOUND:', data);
                    
                    const tokenData = {
                        mint: data.mint,
                        name: data.name,
                        symbol: data.symbol,
                        image_uri: data.uri, // URI usually contains the metadata JSON, might need a second fetch to get the actual image
                        market_cap: data.marketCapSol
                        // created_at removed to rely on DB default (found_at or similar)
                    };

                    // 1. Save to Supabase (PERSISTENCE)
                    const { error } = await supabase
                        .from('tokens')
                        .insert([tokenData]);
                    
                    if (error) {
                        console.error('Error saving to Supabase:', error);
                        // Even if DB fails, update UI
                    }

                    // 2. Notify UI
                    onTokenFound(tokenData);
                    
                    // 3. Stop scanning
                    stopTokenScanner();
                }
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

    } catch (err) {
        console.error("Scanner setup failed:", err);
    }
};

export const stopTokenScanner = () => {
    if (socket) {
        socket.close();
        socket = null;
    }
    isScanning = false;
};
