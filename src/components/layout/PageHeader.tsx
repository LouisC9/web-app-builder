// =========================
// PageHeader Component
// Breadcrumb + Title + Optional action
// =========================

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbEntry[];
  children?: React.ReactNode;
}

const PageHeader = ({ title, breadcrumbs, children }: PageHeaderProps) => {
  return (
    <div className="page-header">
      <div>
        {/* ========================= */}
        {/* Breadcrumb */}
        {/* ========================= */}
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="contents">
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* ========================= */}
        {/* Page Title */}
        {/* ========================= */}
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>

      {/* ========================= */}
      {/* Action Buttons (optional) */}
      {/* ========================= */}
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
};

export default PageHeader;
