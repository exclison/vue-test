
import  { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            userRole:state=>state?.userInfo?.role
        }),
        isAdmin(){
            return this.userRole === 1
        },
        isUser(){
            return this.userRole === 2
        },
    },
};
