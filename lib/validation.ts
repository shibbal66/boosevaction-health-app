export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const fullNameRegex = /^[A-Za-z][A-Za-z\s]{1,39}$/;

export const validateEmail = (value: string): string | null => {
  const trimmed = value.trim();

  if (!trimmed) {
    return 'Email is required';
  }

  if (!emailRegex.test(trimmed)) {
    return 'Enter a valid email address';
  }

  return null;
};

export const validatePassword = (value: string): string | null => {
  if (!value) {
    return 'Password is required';
  }

  if (!passwordRegex.test(value)) {
    return 'Password must be at least 8 characters and include a number';
  }

  return null;
};

export const validateFullName = (value: string): string | null => {
  const trimmed = value.trim();

  if (!trimmed) {
    return 'Full name is required';
  }

  if (!fullNameRegex.test(trimmed)) {
    return 'Full name must be 2–40 characters and use letters and spaces only';
  }

  return null;
};
