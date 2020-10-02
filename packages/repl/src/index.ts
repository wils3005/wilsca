import { join } from 'path';
import { start } from 'repl';
import { sync } from 'glob';

const prompt = 'ts-node > ';
const { context } = start(prompt);
const fileNames = sync(join(process.cwd(), 'src', '**', '*.ts'));

async function addModuleToContext(
  moduleName: string,
  modulePath: string
): Promise<void> {
  try {
    context[moduleName] = (await import(modulePath)) as unknown;
  } catch (e) {
    console.error(e);
  }
}

function addModulesToContext(fileName: string): void {
  const moduleName = String(
    fileName.replace('.ts', '').split('/').filter(isValidModuleName).pop()
  );

  const modulePath = fileName.replace(process.cwd(), '.');
  void addModuleToContext(moduleName, modulePath);
}

function isValidModuleName(moduleName: string): boolean {
  return !/(index)|(src)/.test(moduleName);
}

fileNames.forEach(addModulesToContext);
Object.assign(context, { fileNames });

export { addModuleToContext, addModulesToContext, isValidModuleName };
