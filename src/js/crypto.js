import {
  generateKey,
  readKeys,
  encrypt,
  readMessage,
  readPrivateKey,
  decryptKey,
  decrypt,
  createMessage
} from 'openpgp';

export async function generateMyKeys(emailParams, passphraseParams, curveParams) {
  const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const email = emailParams;
  const passphrase = passphraseParams;
  const curve = curveParams;
  return await generateKey({
    curve: curveParams,
    userIDs: [{ name: name, email: email }],
    passphrase: passphrase
  });
}

export async function encryptText(text, armoredKeys) {
  const publicKeys = await readKeys({ armoredKeys });

  const encrypted = await encrypt({
    message: await createMessage({ text }),
    encryptionKeys: publicKeys
  });

  return encrypted;
}

export async function decryptText(armoredMessage, armoredKey, passphrase) {
  const privateKey = await readPrivateKey({ armoredKey });
  const decryptedPrivateKey = await decryptKey({ privateKey, passphrase });

  const { data: decrypted } = await decrypt({
      message: await readMessage({ armoredMessage }),
      decryptionKeys: decryptedPrivateKey
  });

  return decrypted;
}
