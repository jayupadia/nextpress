'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { registerSchema } from '@/backend/modules/auth/authValidation';
import { useAuth } from '@/frontend/services/authService';

export const RegisterForm = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
    };

    try {
      registerSchema.parse(data);
      await register(data);
      router.push('/auth/login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Name"
        name="name"
        type="text"
        required
        error={errors.name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        required
        error={errors.password}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;