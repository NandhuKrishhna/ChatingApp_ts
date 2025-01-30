import bcrypt from 'bcryptjs';
export const hashPassword = async(value:string , saltRounds?:number)  =>
    bcrypt.hash(value, saltRounds || 10);
export const comparePassword = async (value: string, hashedValue: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(value, hashedValue);
    } catch {
        return false;
    }
};
