export class AppSettings{
    public static API_ENDPOINT = (window.location.hostname=='localhost')? 'https://develop.adit.qo.is/api':'/api';
}