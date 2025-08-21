
export default function PaymentCanceled() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Canceled</h1>
        <p className="text-muted-foreground">Your payment was canceled. You can try again anytime.</p>
      </div>
    </div>
  );
}
