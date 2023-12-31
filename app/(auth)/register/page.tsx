import { cookies } from 'next/headers';
import RegisterForm from './RegisterForm';
import { getValidSessionByToken } from '../../../database/sessions';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  // if the user is logged in redirect

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (session) redirect('/homepage');

  return <RegisterForm />;
}
