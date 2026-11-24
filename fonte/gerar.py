"""Gera app.bin.js (configuração + motor, codificados) a partir de fonte/config.js e fonte/motor.js.
Rode: python3 fonte/gerar.py"""
import base64, os, random
D=os.path.dirname(os.path.abspath(__file__)); R=os.path.dirname(D)
src=open(f'{D}/config.js',encoding='utf-8').read()+'\n'+open(f'{D}/motor.js',encoding='utf-8').read()
data=src.encode('utf-8')
key=bytes(random.SystemRandom().randrange(256) for _ in range(29))
enc=bytes(b ^ key[i % len(key)] ^ ((i*7) & 255) for i,b in enumerate(data))
b64=base64.b64encode(enc).decode()
k=','.join(str(x) for x in key)
loader=("/* Aplicativo de Receita — © Ana Flávia. Todos os direitos reservados. Proibida a cópia ou revenda. */\n"
 "(function(){var k=[%s],s=atob('%s'),n=s.length,u=new Uint8Array(n);"
 "for(var i=0;i<n;i++)u[i]=s.charCodeAt(i)^k[i%%k.length]^((i*7)&255);"
 "var t=new TextDecoder('utf-8').decode(u);(new Function(t))();})();\n") % (k,b64)
open(f'{R}/app.bin.js','w').write(loader)
print('app.bin.js', len(loader)//1024, 'KB')
