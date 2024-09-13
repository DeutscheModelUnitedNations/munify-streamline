# MUNify Streamline

MUNify Streamline is a service that handles all synching and data management across all MUNify services. It is based on a selfhosted [trigger.dev v3](https://trigger.dev) instance.

This is highly customized to fit the needs of the Deutsche Model United Nations (DMUN) IT infrastructure. For anyone using the other MUNify services on their own servers, this repository is not applicable. It can only be used as a reference.

## Script Source
All scripts available in the trigger.dev Webapp are stored in the [`scripts`](scripts) directory. Each script is stored in a separate file with the name of the script as the filename.

## Development
To develop a service, you need to clone this repository (and create a new branch if necessary), update all dependencies and create or edit a script in the `scripts` directory.

```bash
git clone https://github.com/deutschemodelunitednations/munify-streamline
cd munify-streamline
npm install
```

>  Make sure to have Node.js installed on your system.

### Working with 

## Testing
To test a script, you can use the trigger.dev CLI to run the scripts in a development environment on the trigger.dev instance.

1. Log in to the trigger.dev CLI if you haven't already. You need an account on the trigger.dev instance first. Ask the DMUN Support Team for an account.
    ```bash
    npm run login
    ```

2. Run the dev script
    ```bash
    npm run dev <script-name>
    ```

3. Check the trigger Webapp to trigger a test run of the script.

## Deployment
To deploy a script to `staging` (hardly ever used) or `production`, you should create a pull request to the `main` branch. Once the pull request is merged, a CI/CD pipeline will automatically deploy the script to the trigger.dev instance, where you can manage the execution of the script and the production environment variables.

In rare cases, it might be necessary to deploy a script manually. In this case, you can use the trigger.dev CLI to deploy the script: 
```bash
npm run deploy # for production
npm run deploy:staging # for staging
```

## Contributing
We are always happy to welcome new contributors. However, since this is a very much customized repository and only really applicable for our own infrastructure, your help might be limited and we would recommend contributing to the other MUNify services instead where your help is more valuable.

## License
This repository is licensed under the GNU Affero General Public License. For more information, see the [LICENSE](LICENSE) file.