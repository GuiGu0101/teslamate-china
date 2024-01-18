defmodule TeslaMate.Repo.Migrations.ChangeAddressOsmIdType do
  use Ecto.Migration

  def change do
    alter table(:addresses) do
      modify(:osm_id, :string, size: 40)
    end
  end
end
