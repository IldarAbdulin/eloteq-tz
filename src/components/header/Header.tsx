import { HEADER_LINKS } from '../../constants/header-links';
import GitHubLogo from '../../shared/assets/GitHubLogo';
import CustomNavLink from '../../shared/ui/CustomNavlink';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 max-[560px]:block">
      <div className="flex items-center gap-4 max-[560px]:mb-4">
        <GitHubLogo />
        <span>ELOTEQ TZ</span>
      </div>
      <nav className="flex space-x-6 max-[560px]:space-x-2">
        {HEADER_LINKS.map((link) => (
          <CustomNavLink key={link.label} to={link.to} label={link.label} />
        ))}
      </nav>
    </header>
  );
};

export default Header;
