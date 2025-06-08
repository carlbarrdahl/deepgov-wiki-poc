import Image from "next/image";
import { PropsWithChildren } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Frontmatter } from "@/lib/mddb";

const SectionHeader = (props: PropsWithChildren) => (
  <h4 className="font-medium text-gray-900 mb-2" {...props} />
);

export function WikiSidebar(props: Frontmatter) {
  const {
    title,
    image,
    category,
    subcategory,
    status,
    location,
    start_date,
    completion_date,
    total_cost,
    funding_secured,
    funding_gap,
    beneficiaries,
    impact_metrics,
    sustainability,
    scalability,
    open_source,
    technologies,
    partners,
    contact,
    website,
    karma_gap_id,
    oso_id,
    gainforest_id,
  } = props;

  return (
    <div className="w-80 p-6 border-l bg-gray-50">
      <Card>
        <CardHeader className="pb-4">
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={image || "/placeholder.svg?height=200&width=300"}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-center text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info Grid */}
          <div className="gap-4 text-sm">
            <div>
              <span className="text-gray-500">Category:</span>
              <div className="font-medium">{category}</div>
            </div>
            <div>
              <span className="text-gray-500">Subcategory:</span>
              <div className="font-medium">{subcategory}</div>
            </div>
            <div>
              <span className="text-gray-500">Status</span>
              <Badge variant="secondary" className="ml-1">
                {status}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Project Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Location:</span>
              <span className="font-medium text-right">{location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Start Date:</span>
              <span className="font-medium">{start_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Completion Date:</span>
              <span className="font-medium">{completion_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Cost:</span>
              <span className="font-medium">{total_cost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Funding Secured:</span>
              <span className="font-medium">{funding_secured}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Funding Gap:</span>
              <span className="font-medium">{funding_gap}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Beneficiaries:</span>
              <span className="font-medium text-right">{beneficiaries}</span>
            </div>
          </div>

          {/* Project Characteristics */}
          {(sustainability || scalability || open_source) && (
            <>
              <Separator />
              <div className="space-y-2 text-sm">
                {sustainability && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sustainability:</span>
                    <Badge
                      variant={
                        sustainability === "High" ? "default" : "secondary"
                      }
                    >
                      {sustainability}
                    </Badge>
                  </div>
                )}
                {scalability && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scalability:</span>
                    <Badge
                      variant={scalability === "High" ? "default" : "secondary"}
                    >
                      {scalability}
                    </Badge>
                  </div>
                )}
                {open_source && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Open Source:</span>
                    <Badge
                      variant={open_source === "Yes" ? "default" : "secondary"}
                    >
                      {open_source}
                    </Badge>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Impact Metrics */}
          {impact_metrics?.length && (
            <>
              <Separator />
              <div>
                <SectionHeader>Impact Metrics</SectionHeader>
                <ul className="text-sm text-gray-600 space-y-1">
                  {impact_metrics.map((metric, index) => (
                    <li key={index}>• {metric}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Technologies */}
          {technologies?.length && (
            <>
              <Separator />
              <div>
                <SectionHeader>Technologies</SectionHeader>
                <div className="flex flex-wrap gap-1">
                  {technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Partners */}
          {partners?.length && (
            <>
              <Separator />
              <div>
                <SectionHeader>Partners</SectionHeader>
                <ul className="text-sm text-gray-600 space-y-1">
                  {partners.map((partner, index) => (
                    <li key={index}>• {partner}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Contact & Links */}
          {(contact || website) && (
            <>
              <Separator />
              <div className="space-y-2">
                {contact && (
                  <div>
                    <span className="text-gray-500 text-sm">Contact:</span>
                    <div className="font-medium text-sm">
                      <a
                        href={`mailto:${contact}`}
                        className="text-blue-600 hover:underline"
                      >
                        {contact}
                      </a>
                    </div>
                  </div>
                )}
                {website && (
                  <div>
                    <span className="text-gray-500 text-sm">Website:</span>
                    <div className="font-medium text-sm">
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* External Platform IDs */}
          {(karma_gap_id || oso_id || gainforest_id) && (
            <>
              <Separator />
              <div>
                <SectionHeader>External References</SectionHeader>
                <div className="space-y-1 text-sm">
                  {karma_gap_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Karma Gap:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {karma_gap_id}
                      </span>
                    </div>
                  )}
                  {oso_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">OSO:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {oso_id}
                      </span>
                    </div>
                  )}
                  {gainforest_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">GainForest:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {gainforest_id}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
