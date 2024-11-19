const esbuild = require('esbuild');
const { exec } = require('child_process');
const path = require('path');

async function buildAngularApp(): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(
            'npx nx build test-kit',
            { cwd: path.resolve(__dirname, '../') },
            (error: any, stdout: any, stderr: any) => {
                if (error) {
                    console.error(`Nx build error: ${stderr}`);
                    return reject(error);
                }
                console.info(stdout);
                resolve();
            },
        );
    });
}

async function buildBackgroundScript(): Promise<void> {
    return esbuild.build({
        entryPoints: ['apps/test-kit/src/background.ts'],
        bundle: true,
        write: true,
        outdir: 'dist/apps/test-kit/',
    });
}

async function buildTestKit(): Promise<void> {
    try {
        console.info('Building Angular app...');
        await buildAngularApp();

        console.info('Building background script...');
        await buildBackgroundScript();

        console.info('Build completed successfully.');
    } catch (error) {
        console.error('Build failed:', error);
    }
}

buildTestKit();
