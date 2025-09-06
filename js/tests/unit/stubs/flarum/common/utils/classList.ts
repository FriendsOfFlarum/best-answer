export default function classList(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}
