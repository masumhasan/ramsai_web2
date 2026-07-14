import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authApi } from '../api/auth.api';

type Step = 'email' | 'otp' | 'reset' | 'done';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.sendOtp(email);
      setStep('otp');
    } catch (err: unknown) {
      setError((err as { response?: { data?: { error?: string } } })?.response?.data?.error ?? 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.verifyOtp(email, otp);
      setStep('reset');
    } catch (err: unknown) {
      setError((err as { response?: { data?: { error?: string } } })?.response?.data?.error ?? 'Invalid OTP');
    } finally { setLoading(false); }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters'); return; }
    setError('');
    setLoading(true);
    try {
      await authApi.resetPassword(email, otp, newPassword);
      setStep('done');
    } catch (err: unknown) {
      setError((err as { response?: { data?: { error?: string } } })?.response?.data?.error ?? 'Reset failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand shadow-lg shadow-brand/20">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-text-primary">Reset Password</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {step === 'email' && 'Enter your admin email to receive an OTP'}
            {step === 'otp' && `Enter the OTP sent to ${email}`}
            {step === 'reset' && 'Set your new password'}
            {step === 'done' && 'Password reset successfully'}
          </p>
        </div>

        <div className="rounded-xl border border-border-soft bg-dark-card p-6 shadow-xl">
          {step === 'email' && (
            <form onSubmit={handleEmail} className="space-y-4">
              <Input label="Admin Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
              {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>}
              <Button type="submit" loading={loading} className="w-full">Send OTP</Button>
            </form>
          )}
          {step === 'otp' && (
            <form onSubmit={handleOtp} className="space-y-4">
              <Input label="6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required autoFocus />
              {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>}
              <Button type="submit" loading={loading} className="w-full">Verify OTP</Button>
              <button type="button" onClick={() => setStep('email')} className="w-full text-xs text-text-muted hover:text-text-secondary">Resend OTP</button>
            </form>
          )}
          {step === 'reset' && (
            <form onSubmit={handleReset} className="space-y-4">
              <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required autoFocus />
              <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>}
              <Button type="submit" loading={loading} className="w-full">Reset Password</Button>
            </form>
          )}
          {step === 'done' && (
            <div className="space-y-4 text-center">
              <p className="text-sm text-accent-green">Your password has been reset successfully.</p>
              <Button onClick={() => navigate('/dashboard/login')} className="w-full">Back to Login</Button>
            </div>
          )}

          {step !== 'done' && (
            <div className="mt-4 text-center">
              <Link to="/dashboard/login" className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary">
                <ArrowLeft size={12} /> Back to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
