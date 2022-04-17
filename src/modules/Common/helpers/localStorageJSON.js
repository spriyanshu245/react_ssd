export function getItem(key)
{
	return JSON.parse(localStorage.getItem((key)));
}

export function setItem(key, json)
{
	return localStorage.setItem(key, JSON.stringify(json));
}