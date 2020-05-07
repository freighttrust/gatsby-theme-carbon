import React, { useContext } from 'react';
import cx from 'classnames';
import NavContext from '../../util/context/NavContext';
import { nav, open, divider, link, linkDisabled } from './Switcher.module.scss';

const Switcher = ({ children }) => {
  const { switcherIsOpen } = useContext(NavContext);

  return (
    <nav
      className={cx(nav, { [open]: switcherIsOpen })}
      aria-label="Freight Trust & Clearing"
      aria-expanded={switcherIsOpen}
      tabIndex="-1"
    >
      <ul>{children}</ul>
    </nav>
  );
};

export const SwitcherDivider = (props) => (
  <li className={divider}>
    <span {...props} />
  </li>
);

export const SwitcherLink = ({
  disabled,
  children,
  href: hrefProp,
  ...rest
}) => {
  const href = disabled || !hrefProp ? undefined : hrefProp;
  const className = disabled ? linkDisabled : link;
  const { switcherIsOpen } = useContext(NavContext);

  return (
    <li>
      <a
        aria-disabled={disabled}
        role="button"
        tabIndex={switcherIsOpen ? 0 : '-1'}
        className={className}
        href={href}
        {...rest}
      >
        {children}
      </a>
    </li>
  );
};

// https://css-tricks.com/using-css-transitions-auto-dimensions/
// Note: if you change this, update the max-height in the switcher stylesheet
const DefaultChildren = () => {
  const eventLaunch = new Date('May 15, 2020');
  const today = new Date();

  // TODO: remove after 12/2/2019 launch
  const eventProps =
    today >= eventLaunch
      ? { href: '#' }
      : { disabled: true };

  return (
    <>
      <SwitcherLink href="#">Trucking</SwitcherLink>
      <SwitcherLink href="#">
        Maritime
      </SwitcherLink>
      <SwitcherLink href="#">Brokers</SwitcherLink>
      <SwitcherDivider>Solutions</SwitcherDivider>
      <SwitcherLink href="#">
        Customs U.S.
      </SwitcherLink>
      <SwitcherLink href="#">
        Trade Finance
      </SwitcherLink>
      <SwitcherLink {...eventProps}>Network Launch</SwitcherLink>
      <SwitcherLink disabled>Network Status</SwitcherLink>
      <SwitcherDivider>Documentation</SwitcherDivider>
      <SwitcherLink href="https://freight-chain.github.io/obm">
        Enterprise
      </SwitcherLink>
      <SwitcherLink href="#">
        Benchmarks
      </SwitcherLink>
      <SwitcherLink href="#">
        Request Information
      </SwitcherLink>
      <SwitcherLink href="#">
        Pricing
      </SwitcherLink>
    </>
  );
};

Switcher.defaultProps = {
  children: <DefaultChildren />,
};

export default Switcher;
