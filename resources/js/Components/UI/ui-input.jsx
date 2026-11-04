import { forwardRef, useState, useId } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import Label from '@/Components/UI/ui-label';

const Input = forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-3 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:bg-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = 'Input';

const PasswordInput = forwardRef(({ className, label, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="grid w-full items-center gap-2">
            {label && <Label htmlFor={id}>{label}</Label>}
            <div className="relative">
                <Input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    className={cn('pe-10', className)}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                >
                    {showPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                        <Eye className="size-4" aria-hidden="true" />
                    )}
                </button>
            </div>
        </div>
    );
});
PasswordInput.displayName = 'PasswordInput';

export { Input, PasswordInput };
