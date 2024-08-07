export interface AlertNotification {
    notificationType: NotificationType;
    message: string;
    time: number;
}
  
export enum NotificationType {
Success = 'success',
Error = 'error',
Warning = 'warning'
}