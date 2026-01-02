export interface GoogleSheet {
  id: string;
  name: string;
  modifiedTime?: string;
}

export async function fetchUserSheets(
  accessToken: string
): Promise<GoogleSheet[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'&orderBy=modifiedTime desc&pageSize=50&fields=files(id,name,modifiedTime)`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sheets");
    }

    const data = await response.json();

    return data.files.map((file: any) => ({
      id: file.id,
      name: file.name,
      modifiedTime: file.modifiedTime,
    }));
  } catch (error) {
    console.error("Error fetching sheets:", error);
    throw error;
  }
}
