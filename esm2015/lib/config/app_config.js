import { DataVizUiEnvironmentManager } from './data-viz-ui-environment-manager';
export class AppConfig {
    static fetchAppEnv() {
        this.appEnv = DataVizUiEnvironmentManager.getEnvironment();
        return this.appEnvMapping[this.appEnv] || 'dev';
    }
    static environmentFileConstant() {
        return ['environment', this.fetchAppEnv(), 'json']
            .filter(Boolean)
            .join('.');
    }
    static apiUrl() {
        return this.appEnvApiUrlMapping[this.fetchAppEnv()];
    }
}
AppConfig.appEnvMapping = {
    dev: 'dev',
    snapshot: 'dev',
    stable: 'stable',
    production: 'production',
};
AppConfig.appEnvApiUrlMapping = {
    dev: 'https://data-viz.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
    stable: 'https://data-viz.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
    production: 'https://data-viz.dev.drg-understand.aws.clarivate.net/DatavizApiGateway/',
};
AppConfig.appEnv = 'dev';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX2NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGEtdml6LXVpL3NyYy9saWIvY29uZmlnL2FwcF9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFaEYsTUFBTSxPQUFPLFNBQVM7SUFpQmIsTUFBTSxDQUFDLFdBQVc7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRywyQkFBMkIsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBRU0sTUFBTSxDQUFDLHVCQUF1QjtRQUNuQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUM7YUFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTTtRQUNsQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDOztBQTVCYSx1QkFBYSxHQUE4QjtJQUN2RCxHQUFHLEVBQUUsS0FBSztJQUNWLFFBQVEsRUFBRSxLQUFLO0lBQ2YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsVUFBVSxFQUFFLFlBQVk7Q0FDekIsQ0FBQztBQUVZLDZCQUFtQixHQUE4QjtJQUM3RCxHQUFHLEVBQUUsMEVBQTBFO0lBQy9FLE1BQU0sRUFBRSwwRUFBMEU7SUFDbEYsVUFBVSxFQUFFLDBFQUEwRTtDQUN2RixDQUFDO0FBRVksZ0JBQU0sR0FBRyxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhVml6VWlFbnZpcm9ubWVudE1hbmFnZXIgfSBmcm9tICcuL2RhdGEtdml6LXVpLWVudmlyb25tZW50LW1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcENvbmZpZyB7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXBwRW52TWFwcGluZzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuICAgIGRldjogJ2RldicsXHJcbiAgICBzbmFwc2hvdDogJ2RldicsXHJcbiAgICBzdGFibGU6ICdzdGFibGUnLFxyXG4gICAgcHJvZHVjdGlvbjogJ3Byb2R1Y3Rpb24nLFxyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXBwRW52QXBpVXJsTWFwcGluZzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuICAgIGRldjogJ2h0dHBzOi8vZGF0YS12aXouZGV2LmRyZy11bmRlcnN0YW5kLmF3cy5jbGFyaXZhdGUubmV0L0RhdGF2aXpBcGlHYXRld2F5LycsXHJcbiAgICBzdGFibGU6ICdodHRwczovL2RhdGEtdml6LmRldi5kcmctdW5kZXJzdGFuZC5hd3MuY2xhcml2YXRlLm5ldC9EYXRhdml6QXBpR2F0ZXdheS8nLFxyXG4gICAgcHJvZHVjdGlvbjogJ2h0dHBzOi8vZGF0YS12aXouZGV2LmRyZy11bmRlcnN0YW5kLmF3cy5jbGFyaXZhdGUubmV0L0RhdGF2aXpBcGlHYXRld2F5LycsXHJcbiAgfTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBhcHBFbnYgPSAnZGV2JztcclxuXHJcbiAgcHVibGljIHN0YXRpYyBmZXRjaEFwcEVudigpOiBzdHJpbmcge1xyXG4gICAgdGhpcy5hcHBFbnYgPSBEYXRhVml6VWlFbnZpcm9ubWVudE1hbmFnZXIuZ2V0RW52aXJvbm1lbnQoKTtcclxuICAgIHJldHVybiB0aGlzLmFwcEVudk1hcHBpbmdbdGhpcy5hcHBFbnZdIHx8ICdkZXYnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBlbnZpcm9ubWVudEZpbGVDb25zdGFudCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFsnZW52aXJvbm1lbnQnLCB0aGlzLmZldGNoQXBwRW52KCksICdqc29uJ11cclxuICAgICAgLmZpbHRlcihCb29sZWFuKVxyXG4gICAgICAuam9pbignLicpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhcGlVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmFwcEVudkFwaVVybE1hcHBpbmdbdGhpcy5mZXRjaEFwcEVudigpXTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==