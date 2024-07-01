'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRegisterEmpresaModal from "@/app/hooks/useRegisterEmpresaModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const registerEmpresaModal = useRegisterEmpresaModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    console.log("el user es", currentUser)
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {currentUser?.type === "empresa" ? <div 
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Agrega tu paquete turístico
        </div> : null}
        <div 
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[80vw]       // Cambiado: Ancho para pantallas pequeñas
            md:w-[50vw]    // Cambiado: Ancho para pantallas medianas
            lg:w-[40vw]    // Cambiado: Ancho para pantallas grandes
            xl:w-[8vw]    // Cambiado: Ancho para pantallas extra grandes
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="Pagar Reservas" 
                  onClick={() => router.push('/trips')}
                />
                <MenuItem 
                  label="Mis favoritos" 
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem 
                  label="Mis reservas" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="Mis paquetes turísticos" 
                  onClick={() => router.push('/properties')}
                />
                <MenuItem 
                  label="Agrega tu paquete turístico "  
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Cerrar sesión" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Iniciar Sesión" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Regístrese" 
                  onClick={registerModal.onOpen}
                />
                <MenuItem 
                  label="Regístrese como empresa" 
                  onClick={registerEmpresaModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
