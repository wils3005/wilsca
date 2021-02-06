import { expect } from 'chai';
import { Client } from '../../../src/models/client';
import { Realm } from '../../../src/models/realm';
import { CheckBrokenConnections } from '../../../src/services/checkBrokenConnections';

describe('checkBrokenConnections service', () => {
    it('should remove client after 2 checks', (done) => {
        const realm = new Realm();
        const doubleCheckTime = 55;//~ equals to checkBrokenConnections.checkInterval * 2
        const checkBrokenConnections = new CheckBrokenConnections({ realm, config: { alive_timeout: doubleCheckTime }, checkInterval: 30 });
        const client = new Client({ id: 'id', token: '' });
        realm.setClient(client, 'id');

        checkBrokenConnections.start();

        setTimeout(() => {
            expect(realm.getClientById('id')).to.be.undefined;
            checkBrokenConnections.stop();
            done();
        }, checkBrokenConnections.checkInterval * 2 + 30);
    });

    it('should remove client after 1 ping', (done) => {
        const realm = new Realm();
        const doubleCheckTime = 55;//~ equals to checkBrokenConnections.checkInterval * 2
        const checkBrokenConnections = new CheckBrokenConnections({ realm, config: { alive_timeout: doubleCheckTime }, checkInterval: 30 });
        const client = new Client({ id: 'id', token: '' });
        realm.setClient(client, 'id');

        checkBrokenConnections.start();

        //set ping after first check
        setTimeout(() => {
            client.setLastPing(new Date().getTime());

            setTimeout(() => {
                expect(realm.getClientById('id')).to.be.undefined;
                checkBrokenConnections.stop();
                done();
            }, checkBrokenConnections.checkInterval * 2 + 10);
        }, checkBrokenConnections.checkInterval);
    });
});
