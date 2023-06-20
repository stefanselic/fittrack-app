'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './LoginForm.module.scss';

type Props = { returnTo?: string };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }
    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className={styles.inputContainer}>
        <label className={styles.usernameInput}>
          Username:
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label className={styles.passwordInput}>
          Password:
          <input
            value={password}
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={async () => await login()}>
          Login
        </button>
      </div>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
