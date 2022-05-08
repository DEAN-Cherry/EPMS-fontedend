import { KeycloakService } from 'keycloak-angular';
import { LoginService } from '../service/login.service';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    return keycloak
      .init({
        config: {
          url: 'http://localhost:8085',
          realm: 'epms', //设置Realm
          clientId: 'epms-client', //设置client
        },
        initOptions: {
          onLoad: 'check-sso',
          flow: 'standard',
        },
      })
      .then(async () => {
        //登录成功
        let isLoggedIn: boolean = await keycloak.isLoggedIn();
        sessionStorage.setItem('isLoggedIn', isLoggedIn.toString());
        // let roleId = '0';
        // let roleTypes = {
        //   ROLE_ADMIN: '1',
        //   ROLE_CUSTOMER: '2',
        //   ROLE_OPERATOR: '3',
        // };
        if (isLoggedIn) {
          let userProfile = await keycloak.loadUserProfile();
          let roleArray = keycloak.getUserRoles(true);
          //登录成功后，将role信息保存到sessionStorage，以后整个应该中随时随处可以使用
          if (roleArray.length == 0) {
            sessionStorage.setItem('userRole', '3');
          } else {
            roleArray.indexOf('ROLE_ADMIN') != -1
              ? sessionStorage.setItem('userRole', '1')
              : roleArray.indexOf('ROLE_OPERATOR') != -1
              ? sessionStorage.setItem('userRole', '2')
              : sessionStorage.setItem('userRole', '3');
          }
          console.log(
            'Debug: the current user name is: ' + JSON.stringify(userProfile)
          );
          console.log(
            'Debug: the current user role is: ' +
              sessionStorage.getItem('userRole')
          );
          //得到keycloak 的 access token。
          keycloak.getToken().then((data) => {
            console.log('Debug: the keycloak access token is ' + data);
            sessionStorage.setItem('accessToken', data);
          });
          let loginService = new LoginService();

          let profile: any = {
            id: userProfile.id,
            isLoggedIn: isLoggedIn,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            userName: userProfile.username,
            userRole: Number(sessionStorage.getItem('userRole')),
            email: userProfile.email,
            emailVerified: userProfile.emailVerified,
          };
          loginService.updateProfile(profile);

          loginService.updateProfile(userProfile);
        } else {
          console.log('Debug: the current user is not logged in');
          sessionStorage.clear();
        }
      })
      .catch((error) =>
        //登录失败
        console.error('Keycloak login failed: ', error)
      );
  };
}
