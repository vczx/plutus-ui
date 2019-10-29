export async function callApi(method: string, url: string, path: string, data?: any) {
  const res = await fetch(`${url}/api${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export class ApiUtils {
  public static apiHost = 'http://localhost';
  public static apiPort = '8080';
  public static apiUrl = `${ApiUtils.apiHost}:${ApiUtils.apiPort}`;
}
