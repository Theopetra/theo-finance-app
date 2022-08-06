type LogEventParams = {
  userId?: string;
  deviceId?: string;
  name: string;
  data?: object;
};

import { v4 as uuidv4 } from 'uuid';

// device id allows us to understand user device switching, etc.
const deviceIdKey = 'deviceId';

// this will allow us to identify the user even if e.g. they have disconnected the wallet
const walletAddressKey = 'walletId';

export function setDeviceId() {
  if (!localStorage.getItem(deviceIdKey)) {
    localStorage.setItem(deviceIdKey, uuidv4());
  }
}

export function getDeviceId() {
  return localStorage.getItem(deviceIdKey) || '';
}

export function setWallet(wallet: string) {
  return localStorage.setItem(walletAddressKey, wallet);
}

export function getWallet() {
  return localStorage.getItem(walletAddressKey) || '';
}

export async function logEvent(params: LogEventParams) {
  let { userId, deviceId, name, data } = params;

  userId = userId || getWallet();
  deviceId = deviceId || getDeviceId();

  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
    return await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/events`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        device_id: deviceId,
        event_type: name,
        event_properties: data,
      }),
    });
  }
}
