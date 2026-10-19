from pathlib import Path
import os,re,shutil,hashlib
root=Path(__file__).resolve().parents[1]
repo=os.environ.get('GITHUB_REPOSITORY','seo168/et7-website')
owner,name=repo.split('/')
custom_domain=(root/'dist'/'CNAME').read_text().strip() if (root/'dist'/'CNAME').exists() else ''
base='/' if custom_domain or name==owner+'.github.io' else '/'+name+'/'
origin='https://'+custom_domain if custom_domain else 'https://'+owner+'.github.io'+base.rstrip('/')
site=root/'_site'
if site.exists():shutil.rmtree(site)
shutil.copytree(root/'dist',site)
for p in site.rglob('*'):
 if not p.is_file() or not (p.suffix in ['.html','.js','.css','.json'] or p.parent.name=='api'):continue
 s=p.read_text()
 if custom_domain:s=s.replace('https://seo168.github.io/et7-website',origin)
 s=re.sub(r'(?<![A-Za-z0-9_/-])/(aw9-v107|brand|media|global|api)/',lambda m:base+m[1]+'/',s)
 s=s.replace('"aw9-v107/','"'+base.lstrip('/')+'aw9-v107/')
 s=s.replace('http://127.0.0.1:4173','https://'+owner+'.github.io')
 s=s.replace('D(ye,{routes:ve,','D(ye,{base:'+repr(base)+',routes:ve,')
 s=s.replace('href="/"','href="'+base+'"')
 p.write_text(s)
# Version the complete JS module graph so existing mobile browsers fetch updated UI.
js_files=sorted(site.rglob('*.js'))
revision=hashlib.sha256(b''.join(p.read_bytes() for p in js_files)).hexdigest()[:12]
renames={p.name:p.stem+'.rev-'+revision+'.js' for p in js_files}
for p in site.rglob('*'):
 if not p.is_file() or p.suffix not in ('.html','.js','.css','.json'):continue
 text=p.read_text()
 for old,new in renames.items():text=text.replace(old,new)
 p.write_text(text)
for p in js_files:p.rename(p.with_name(renames[p.name]))
# Materialize language routes so direct visits and refreshes return HTTP 200.
for lang in ('hi', 'en'):
 (site/lang).mkdir(exist_ok=True)
 (site/lang/'index.html').write_text((site/'index.html').read_text())
error_html=(site/'index.html').read_text()
error_html=re.sub(r'<meta name="robots" content="[^"]*">','<meta name="robots" content="noindex, follow">',error_html)
(site/'404.html').write_text(error_html)
(site/'.nojekyll').touch()
print('Prepared GitHub Pages at '+origin+'/')
