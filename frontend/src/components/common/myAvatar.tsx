'use client';

import { Avatar, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

export default function MyAvatar() {
  const { data: session } = useSession();

  // Si no hay sesión o no hay usuario, renderiza un avatar genérico
  if (!session || !session.user) {
    return (
      <div>
        <Flex gap="2">
          <Avatar fallback="?" />
        </Flex>
      </div>
    );
  }

  // Renderiza el avatar con la imagen del usuario
  return (
    <div>
      <Flex gap="2">
        <Avatar
          src={session.user.image || undefined} // Verifica si la imagen existe
          fallback={session.user.name ? session.user.name[0] : 'A'} // Muestra la primera letra del nombre como fallback
        />
      </Flex>
    </div>
  );
}
