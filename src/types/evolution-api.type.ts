export interface IEvolutionInstanceList {
  instance: {
    instanceName: string;
    owner?: string;
    profileName?: string;
    profilePictureUrl?: string;
    profileStatus?: string;
    status: 'connecting' | 'open' | 'closed';
    apikey: string;
  };
}

export interface IEvolutionInstanceCreate {
  instance: {
    instanceName: string;
    status: string;
  };
  hash: {
    apikey: string;
  };
  qrcode: {
    code: string;
    base64: string;
  };
}

export interface IEvolutionMessageSend {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: {
    extendedTextMessage: {
      text: string;
    };
  };
  messageTimestamp: string;
  status: string;
}
