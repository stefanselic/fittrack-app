'use client';

import { useRouter } from 'next/navigation';
import styles from './DeleteButton.module.scss';
import { useState } from 'react';
import { revalidatePath } from 'next/cache';

type DeleteButtonProps = {
  diaryId: number;
};

export default function DeleteButton({ diaryId }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      /*
        const response = await fetch(`/api/diary?id=${diaryId}`, {
        you can you query paramaters too to delete diary
      */
      const response = await fetch(`/api/diary/${diaryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        router.refresh();
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to delete diary entry:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.exerciseDeleteButtonContainer}>
      <button onClick={handleDelete} disabled={isLoading}>
        {/* {isLoading ? 'Deleting...' : 'Delete'}*/}X
      </button>
    </div>
  );
}

// export function DeleteCartItem(props) {
//   return (
//     <form
//       action={async () => {
//         await deleteCartItem(props.id);
//       }}
//     >
//       <button
//         data-test-id={`cart-product-remove-${props.id}`}
//         className={styles.removeButton}
//       >
//         <Image alt="trash icon" src={trash} width={20} height={20} />
//       </button>
//     </form>
//   );
// }
