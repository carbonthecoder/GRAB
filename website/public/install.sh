#!/usr/bin/env bash
set -e

# GRAB Installer
# Installs grab to ~/.local/bin/grab

INSTALL_DIR="${HOME}/.local/bin"
mkdir -p "${INSTALL_DIR}"

TARGET="${INSTALL_DIR}/grab"

cat << 'EOF' > "${TARGET}"
#!/usr/bin/env bash
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js (>= 18) is required to run GRAB." >&2
  exit 1
fi
exec npx --yes grab "$@"
EOF

chmod +x "${TARGET}"

echo "✓ GRAB successfully installed to ${TARGET}"

case ":${PATH}:" in
  *":${INSTALL_DIR}:"*) ;;
  *)
    echo ""
    echo "Notice: ${INSTALL_DIR} is not in your PATH."
    echo "Add it by adding this line to your ~/.bashrc or ~/.zshrc:"
    echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
    echo ""
    ;;
esac

echo "Run 'grab --help' to get started."
