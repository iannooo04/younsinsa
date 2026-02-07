import { OrderStatus, PaymentMethod } from "@/generated/prisma";

export const ORDER_STATUS_KO: Record<OrderStatus, string> = {
  [OrderStatus.DEPOSIT_WAIT]: "입금대기",
  [OrderStatus.PAYMENT_COMPLETE]: "결제완료",
  [OrderStatus.PREPARING]: "상품준비중",
  [OrderStatus.SHIPPING]: "배송중",
  [OrderStatus.DELIVERED]: "배송완료",
  [OrderStatus.PURCHASE_CONFIRM]: "구매확정",
  [OrderStatus.CANCEL_REQUEST]: "취소신청",
  [OrderStatus.CANCEL_COMPLETE]: "취소완료",
  [OrderStatus.RETURN_REQUEST]: "반품신청",
  [OrderStatus.RETURN_COMPLETE]: "반품완료",
  [OrderStatus.EXCHANGE_REQUEST]: "교환신청",
  [OrderStatus.EXCHANGE_COMPLETE]: "교환완료",
  [OrderStatus.REFUND_REQUEST]: "환불신청",
  [OrderStatus.REFUND_COMPLETE]: "환불완료",
};

export const PAYMENT_METHOD_KO: Record<PaymentMethod, string> = {
  [PaymentMethod.BANK_TRANSFER]: "무통장입금",
  [PaymentMethod.CREDIT_CARD]: "신용카드",
  [PaymentMethod.VIRTUAL_ACCOUNT]: "가상계좌",
  [PaymentMethod.ESCROW]: "에스크로",
  [PaymentMethod.PAYPAL]: "PayPal",
  [PaymentMethod.ALIPAY]: "AliPay",
};

export function getOrderStatusKo(status: OrderStatus): string {
  return ORDER_STATUS_KO[status] || status;
}

export function getPaymentMethodKo(method: PaymentMethod): string {
  return PAYMENT_METHOD_KO[method] || method;
}
