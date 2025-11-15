import * as fs from 'fs';
import * as path from 'path';

export class Utils {
  private static getConfigsDir(): string {
    return path.join(__dirname, '..', '..', '..', 'configs');
  }

  public static readModuleConfig(module: string, filename?: string): any {
    const configFileName = filename || 'config';
    const configsDir = this.getConfigsDir();
    const configPath = path.join(configsDir, module, `${configFileName}.json`);

    try {
      const config = this.readJSONFile(configPath);

      if (!config) {
        throw new Error(
          `Configuration file not found or is empty: ${configPath}`,
        );
      }

      let env = process.env.NODE_ENV || 'development';

      // Return environment-specific config or fallback to development
      const envConfig = config[env] || config['development'];

      if (!envConfig) {
        throw new Error(
          `Configuration for environment '${env}' not found in ${configPath}`,
        );
      }

      console.log(`✓ Loaded ${module} configuration for environment: ${env}`);
      return envConfig;
    } catch (e) {
      console.error(
        `✗ Failed to load ${module} configuration from ${configPath}`,
      );
      console.error(`Error: ${e.message}`);
      throw e;
    }
  }

  public static readJSONFile(filePath: string): any {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File does not exist: ${filePath}`);
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      if (!fileContent || fileContent.trim() === '') {
        throw new Error(`File is empty: ${filePath}`);
      }

      return JSON.parse(fileContent);
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error(`Invalid JSON in file: ${filePath}. ${e.message}`);
      }
      
      throw e;
    }
  }
}
