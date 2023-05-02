import {useEffect} from 'react';
import {
    AuthType,
    SismoConnect,
    SismoConnectClientConfig
} from '@sismo-core/sismo-connect-client';

const sismoConnectConfig: SismoConnectClientConfig = {
    appId: '0x9d7a55d7871a6bb4761534e72d69f1f9'
};

const sismoConnect = SismoConnect(sismoConnectConfig);

export default function Home() {
    useEffect(() => {
        const sismoConnectResponse = sismoConnect.getResponse();

        if (sismoConnectResponse == null) {
            sismoConnect.request({
                auths: [{authType: AuthType.VAULT}]
            });
        } else {
            const proofData = sismoConnectResponse.proofs.at(0)?.proofData || "undefined";
            window.location.replace(`sismo://proof/${proofData}`);
        }
    });
}
