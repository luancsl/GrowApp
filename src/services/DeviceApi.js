import { WifiApi } from "@services"

export default class Device {

    static getTime(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/time`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }

    static setTime(year, month, day, hour, minute, second, addr = '192.168.4.1') {
        const request = fetch(
            `http://${addr}/time`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(`{"Year":"${year}", "Month": "${month}"}, "Day": "${day}"}, "Hour": "${hour}"}, "Minute": "${minute}"}, "Second": "${second}"}`)
            }).then(async (value) => {
                if (value.ok) {
                    return value.json();
                }
                const message = await value.text();
                const erro = new Error(message);
                erro.name = value.status
                throw erro;
            });

        return request;
    }

    static getConfig(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/config`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }

    static getAvaliable(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/avaliable`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }

    static getSpacesAvaliable(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/spacesavaliable`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }

    static getSpaces(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/spaces`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }

    static setSpaces(addr = '192.168.4.1') {
        const request = fetch(
            `http://${addr}/spaces`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(`{"Year":"${year}", "Month": "${month}"}, "Day": "${day}"}, "Hour": "${hour}"}, "Minute": "${minute}"}, "Second": "${second}"}`)
            }).then(async (value) => {
                if (value.ok) {
                    return value.json();
                }
                const message = await value.text();
                const erro = new Error(message);
                erro.name = value.status
                throw erro;
            });

        return request;
    }

    static removeSpaces(addr = '192.168.4.1') {
        const request = fetch(
            `http://${addr}/spaces`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(`{"Year":"${year}", "Month": "${month}"}, "Day": "${day}"}, "Hour": "${hour}"}, "Minute": "${minute}"}, "Second": "${second}"}`)
            }).then(async (value) => {
                if (value.ok) {
                    return value.json();
                }
                const message = await value.text();
                const erro = new Error(message);
                erro.name = value.status
                throw erro;
            });

        return request;
    }

    static getWifiInfo(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/wifi`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }
    static getWifiStatus(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/wifi/status`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }

    static getWifiSignal(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/wifi/signal`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }
    static getWifiDisconnect(addr = '192.168.4.1') {
        const request = fetch(`http://${addr}/wifi/disconnect`).then(async (value) => {
            if (value.ok) {
                return value.json();
            }
            const message = await value.text();
            const erro = new Error(message);
            erro.name = value.status
            throw erro;
        });
        return request;
    }
    static getWifiConnect(ssid, pswd, addr = '192.168.4.1') {
        const data = `{"ssid":"${ssid}", "pswd": "${pswd}"}`;
        const request = fetch(
            `http://${addr}/wifi`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(async (value) => {
                if (value.ok) {
                    return value.json();
                }
                const message = await value.text();
                const erro = new Error(message);
                erro.name = value.status
                throw erro;
            });

        return request;
    }

    static scanLocalDevices() {
        return WifiApi.scanLocalNet().then(reposta => {
            const filter = reposta.filter((value) => {
                return this.isDevice(value.mac);
            })
            return Promise.all(filter.map(item => {
                return this.getWifiSignal(item.host).then(resposta => {
                    return {
                        ...item,
                        rssi: resposta.signal
                    };
                });
            }));
        });

    }

    static scanWifiDevices() {
        return WifiApi.scanWifi().then(resposta => {
            return resposta.filter((value) => {
                return this.isDevice(value.BSSID);
            });
        });
    }
    static getID(bssid) {
        return bssid.substr(9, 17);
    }
    static getWifiName(bssid) {
        return `ESP-${bssid.substr(9, 17).replace(/:/g, '').toUpperCase()}`;
    }
    static getInternalBSSID(id) {
        return 'b4:e6:2d:' + id;
    }
    static getExternalBSSID(id) {
        return 'b6:e6:2d:' + id;
    }
    static isDevice(bssid) {
        return bssid.match(/b[4|6]:e6:2d/i);
    }
    static rssiToPorcent(rssi) {
        return (2 * ((rssi > -50 ? -50 : rssi) + 100));
    }
    static getRSSIStrengthQuality(rssi) {
        if (rssi >= -50) {
            return 'excellent';
        } else if (rssi < -50 && rssi > -60) {
            return 'good';
        } else if (rssi < -60 && rssi > -70) {
            return 'fair';
        } else if (rssi < -70) {
            return 'weak';
        }
    }
    static checkRSSIStrengthQuality(rssi, quality) {
        return this.getRSSIStrengthQuality(rssi) === quality;
    }
}