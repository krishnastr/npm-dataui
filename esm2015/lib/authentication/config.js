import { AppConfig } from '../config/app_config';
export class Config {
    constructor() {
        this.setConfig();
    }
    setConfig() {
        this.apiConfig = {
            apiUrl: AppConfig.apiUrl(),
            endPoints: {
                login: 'login',
                logout: 'logOut',
                ping: 'ping',
            },
            token: 'jwt-token',
        };
    }
    getConfig() {
        return this.apiConfig;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZGF0YS12aXotdWkvc3JjL2xpYi9hdXRoZW50aWNhdGlvbi9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpELE1BQU0sT0FBTyxNQUFNO0lBR2pCO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQzFCLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsT0FBTztnQkFDZCxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNELEtBQUssRUFBRSxXQUFXO1NBQ25CLENBQUM7SUFDSixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBDb25maWcgfSBmcm9tICcuLi9jb25maWcvYXBwX2NvbmZpZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZmlnIHtcclxuICBhcGlDb25maWc6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNldENvbmZpZygpO1xyXG4gIH1cclxuXHJcbiAgc2V0Q29uZmlnKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hcGlDb25maWcgPSB7XHJcbiAgICAgIGFwaVVybDogQXBwQ29uZmlnLmFwaVVybCgpLFxyXG4gICAgICBlbmRQb2ludHM6IHtcclxuICAgICAgICBsb2dpbjogJ2xvZ2luJyxcclxuICAgICAgICBsb2dvdXQ6ICdsb2dPdXQnLFxyXG4gICAgICAgIHBpbmc6ICdwaW5nJyxcclxuICAgICAgfSxcclxuICAgICAgdG9rZW46ICdqd3QtdG9rZW4nLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldENvbmZpZygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBpQ29uZmlnO1xyXG4gIH1cclxufVxyXG4iXX0=