const url_root = 'http://localhost:9093/'

export const environment = {
    usuarios: `${url_root}mikrotik/info?comando=/ppp/secret/print`,
    usuariosVivo: `${url_root}mikrotik/info/outroIp?comando=/ppp/secret/print`,
    usuariosAtivos: `${url_root}mikrotik/ativos`,
    usuariosAtivosVivo: `${url_root}mikrotik/ativos2`,
    
    blockUser: `${url_root}mikrotik/block-user`,
    updatePass: `${url_root}mikrotik/update-password`,
    addUser: `${url_root}mikrotik/add-user`,

    auth: `${url_root}api/oauth2/v1/token`,

    //DashBoard
    upTime: `${url_root}mikrotik/ativosRet`,
};
