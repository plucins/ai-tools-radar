## GitHub Copilot Documentation (Authoritative References)

Always prefer current GitHub documentation when updating plugin behavior:

1. **Copilot CLI plugin reference**  
   <https://docs.github.com/copilot/reference/copilot-cli-reference/cli-plugin-reference>
2. **Copilot CLI command reference**  
   <https://docs.github.com/copilot/reference/copilot-cli-reference/cli-command-reference>
3. **Find and install Copilot CLI plugins**  
   <https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing>
4. **Add skills for Copilot CLI**  
   <https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills>
5. **Create custom agents for Copilot CLI**  
   <https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli>
6. **Custom instructions support matrix**  
   <https://docs.github.com/en/copilot/reference/custom-instructions-support>

Documentation priority:
1) Official GitHub docs  
2) Project instructions (`AGENTS.md`, `.github/copilot-instructions.md`, `.flowbit/docs/`)  
3) Existing repository patterns  
4) General best practices

## Platform Notes: Copilot CLI

For this repository, use Copilot CLI conventions:

- Use sequential single-select prompts when multiple decisions are needed.
- Treat `AGENTS.md` as agent instruction source for Copilot CLI.
- Keep repository-wide behavior in `.github/copilot-instructions.md`.
- Keep plugin metadata in `plugin.json`.
- Use command and skill names exactly as exposed by plugin routing in Copilot CLI.