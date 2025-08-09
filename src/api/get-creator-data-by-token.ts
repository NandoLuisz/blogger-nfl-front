import Cookies from 'js-cookie';
import { api } from '../lib/api';

export async function getDataCreatorByToken<CreatorResponse>(){
    const token = Cookies.get('token-blog-app');
    
    if (!token) return null;

    const response = await api.get<CreatorResponse>(`/creator/data-creator-by-token/${token}`);
    return response.data;
}   