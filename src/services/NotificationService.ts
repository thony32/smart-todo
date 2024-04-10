import Notification from "@/models/Notification";
import supabase from "@/utils/supabaseClient";

class NotificationService {
    async addNotification(notification: Notification) {
        try {
            const { data, error } = await supabase.from('Notifications').insert(notification);
            if (error) {
                throw error;
            }
            return data || [];
        } catch (error) {
            throw error;
        }
    }

    async isInNotifcationList(user_id: string): Promise<Boolean> {
        try {
            const { data, error } = await supabase.from('Notifications').select('user_id').eq('user_id', user_id);
            if (error) {
                throw error;
            }
            if (data && data.length > 0) {
                return true;
            }
        } catch (error) {
            throw error;
        }
        return false;
    }

    async removeNotification(user_id: string) {
        try {
            const { data, error } = await supabase.from('Notifications').delete().eq('user_id', user_id);
            if (error) {
                throw error;
            }
            return data || [];
        } catch (error) {
            throw error;
        }
    }
}

export default new NotificationService();