export class FormLocker
{
    lockForm(form: HTMLFormElement)
    {
        Array.from(form.children).forEach(c => c.disabled = 'disabled');
    }

    unlockForm(form: HTMLFormElement)
    {
        Array.from(form.children).forEach(c => c.removeAttribute('disabled'));
    }
}
