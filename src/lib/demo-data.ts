export const demoServices = [
  { id: "wa", name: "WhatsApp", price: "₦1,200" },
  { id: "tg", name: "Telegram", price: "₦900" },
  { id: "go", name: "Google", price: "₦1,500" },
  { id: "ig", name: "Instagram", price: "₦1,100" },
];

export const demoMessages = [
  {
    id: "1",
    from: "WhatsApp",
    body: "Your verification code is 847291",
    time: "2 min ago",
    number: "+1 (415) 555-0192",
  },
  {
    id: "2",
    from: "Telegram",
    body: "Login code: 552014",
    time: "18 min ago",
    number: "+1 (415) 555-0192",
  },
  {
    id: "3",
    from: "Google",
    body: "G-918273 is your Google verification code.",
    time: "1 hr ago",
    number: "+44 7911 123456",
  },
];

export const demoWallet = {
  balance: "₦12,450.00",
  currency: "NGN",
  transactions: [
    { id: "t1", label: "Wallet top-up", amount: "+₦5,000", time: "Yesterday" },
    { id: "t2", label: "USA number · WhatsApp", amount: "-₦1,200", time: "Yesterday" },
    { id: "t3", label: "Wallet top-up", amount: "+₦10,000", time: "3 days ago" },
  ],
};
