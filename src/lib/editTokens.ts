const key = (id: number) => `editToken:${id}`

export function saveEditToken(id: number, token: string): void {
  localStorage.setItem(key(id), token)
}

export function getEditToken(id: number): string | null {
  return localStorage.getItem(key(id))
}

export function removeEditToken(id: number): void {
  localStorage.removeItem(key(id))
}
