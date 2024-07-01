'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterEmpresaModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const RegisterEmpresaModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      type: 'empresa',
      acceptTerms: false, // Added default value for checkbox
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.acceptTerms) {
      toast.error('Debes aceptar los Términos y Privacidad.');
      return;
    }

    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('¡Registrado!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bienvenido a GaiaXplorer para empresas"
        subtitle="¡Crear una cuenta!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Nombre de la empresa"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Contraseña"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="number"
        label="Nro. de contacto"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="ruc"
        label="RUC"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* Add checkbox for accepting terms and privacy */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="acceptTerms"
          {...register('acceptTerms', { required: true })}
        />
        <label htmlFor="acceptTerms">
          Al registrarme acepto los Términos y Privacidad de GaiaXplorer
        </label>
      </div>
      {/* Add link to download PDF for Terms and Privacy */}
      <a
        href="https://gaiaxplorer.com/tyc.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Ver Términos y Privacidad
      </a>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continuar con Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continuar con Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          ¿Ya tiene una cuenta?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            Iniciar Sesión
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Crear una cuenta"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterEmpresaModal;