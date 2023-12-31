'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './SearchBar.module.scss';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get('search') ?? '');
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceLogic = () => {
      // Run your side effect logic using the debounced value
      if (debouncedValue === '') {
        router.push(`/homepage`);
      } else {
        router.push(`/homepage/?search=${debouncedValue}`);
      }
    };

    const timerId = setTimeout(debounceLogic, 1000);

    return () => {
      clearTimeout(timerId); // Clean up the timer if the component unmounts
    };
  }, [debouncedValue, router]);

  const handleChange = (event: any) => {
    setValue(event.currentTarget.value);
    setDebouncedValue(event.currentTarget.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        data-test-id="search-bar"
        className={styles.searchInput}
        placeholder="Search.."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
