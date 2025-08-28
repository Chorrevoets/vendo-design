// Mock for Next.js useRouter hook for Vite
export function useRouter() {
  return {
    push: (path: string) => {
      console.log('Navigate to:', path)
      // In a real app, you'd use React Router or similar
    },
    replace: (path: string) => {
      console.log('Replace with:', path)
    },
    back: () => {
      console.log('Go back')
    },
    forward: () => {
      console.log('Go forward')
    },
    refresh: () => {
      console.log('Refresh')
    },
    pathname: '/',
    query: {},
    asPath: '/',
  }
}
