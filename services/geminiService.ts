export const generateWifiPasswords = async (businessType: string): Promise<string[]> => {
  try {
    const response = await fetch('/api/generate-passwords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ businessType }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate passwords');
    }

    const data = await response.json();
    return data.passwords;
  } catch (error) {
    console.error("Error generating passwords:", error);
    return [
      "Guest_Wifi_01",
      "Welcome123",
      "Free_Internet",
      "Connect_Here",
      "Fast_Speed_24"
    ];
  }
};